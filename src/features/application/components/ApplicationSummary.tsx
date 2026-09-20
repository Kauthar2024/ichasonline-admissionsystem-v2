import { Link } from '@tanstack/react-router';
import { useProgrammes } from '@/features/programmes';
import { useGetPayments } from '@/lib/use-payments';
import { useMyApplication } from '../hooks';
import type { ApplicantStatus, MyApplication } from '../types';

// How each status reads to the applicant. The officer's own wording
// ("Submitted & Paid") is internal, so it is reworded here.
const STATUS_VIEW: Record<ApplicantStatus, { label: string; card: string; value: string }> = {
  draft: { label: 'In progress', card: 'bg-amber-50 border-amber-200 text-amber-800', value: 'text-amber-900' },
  submitted_paid: { label: 'Submitted — awaiting review', card: 'bg-blue-50 border-blue-200 text-blue-800', value: 'text-blue-900' },
  verified: { label: 'Verified & eligible', card: 'bg-emerald-50 border-emerald-200 text-emerald-800', value: 'text-emerald-900' },
  queried: { label: 'Action needed', card: 'bg-orange-50 border-orange-200 text-orange-800', value: 'text-orange-900' },
  rejected: { label: 'Not successful', card: 'bg-red-50 border-red-200 text-red-800', value: 'text-red-900' },
  admitted: { label: 'Admitted', card: 'bg-purple-50 border-purple-200 text-purple-800', value: 'text-purple-900' },
};

const NOT_STARTED = { label: 'Not started', card: 'bg-gray-50 border-gray-200 text-gray-700', value: 'text-gray-900' };

interface NextStep {
  heading: string;
  detail: string;
  action?: { label: string; to: string };
}

// Mirrors the server's submission rules, so the dashboard points at whatever
// is actually still blocking the applicant.
function nextStep(application: MyApplication | null, feePaid: boolean): NextStep {
  if (!application) {
    return {
      heading: 'Complete Your Application',
      detail: 'Fill in your academic qualifications and select your preferred programme.',
      action: { label: 'Start Application', to: '/education' },
    };
  }

  if (application.status === 'draft') {
    if (application.subjects.length === 0) {
      return { heading: 'Add your examination results', detail: 'Fetch your Form IV results to continue.', action: { label: 'Continue', to: '/education' } };
    }
    if (application.documents.length === 0) {
      return { heading: 'Upload your result slip', detail: 'Attach your NECTA result slip or certificate.', action: { label: 'Continue', to: '/education' } };
    }
    if (!application.firstChoice) {
      return { heading: 'Choose your programme', detail: 'Select the programme you want to be considered for.', action: { label: 'Continue', to: '/programmes' } };
    }
    if (!feePaid) {
      return { heading: 'Pay the application fee', detail: 'Request a control number and pay before submitting.', action: { label: 'Go to Payments', to: '/payments' } };
    }
    return { heading: 'Review and submit', detail: 'Everything is in place — send your application to the admissions office.', action: { label: 'Review & Submit', to: '/submit-application' } };
  }

  if (application.status === 'submitted_paid') {
    return { heading: 'Your application is with the admissions office', detail: 'You will be notified by SMS and email once it has been reviewed.' };
  }
  if (application.status === 'verified') {
    return { heading: 'You are eligible', detail: 'Your application passed verification and is in the selection pool for its programme.' };
  }
  if (application.status === 'queried') {
    return {
      heading: 'The admissions office needs something from you',
      detail: 'Correct what they asked for below, then send your application back for review.',
      action: { label: 'Update & Resubmit', to: '/submit-application' },
    };
  }
  if (application.status === 'rejected') {
    return { heading: 'Your application was not successful', detail: 'The reason given by the admissions office is shown below.' };
  }
  return {
    heading: 'Congratulations — you have been admitted',
    detail: 'Your admission letter has been issued. Collect it from the admissions office with your original certificates.',
  };
}

export function ApplicationSummary() {
  const { data: application = null, isLoading, error } = useMyApplication();
  const { data: programmes = [] } = useProgrammes();
  const { data: payments = [] } = useGetPayments();

  const fee = payments.find((p) => p.payment_type === 'application_fee');
  const feePaid = fee?.status === 'completed';

  const statusView = application ? STATUS_VIEW[application.status] : NOT_STARTED;
  const programmeName = application?.firstChoice
    ? (programmes.find((p) => p.id === application.firstChoice)?.name ?? application.firstChoice)
    : 'Not selected yet';

  const paymentLabel = !fee
    ? 'Unpaid'
    : feePaid
      ? 'Confirmed'
      : fee.status === 'pending'
        ? `Awaiting payment — ${fee.control_number}`
        : fee.status_display;

  const step = nextStep(application, feePaid);
  // The most recent thing the officer said, shown for a query or a rejection.
  const latestDecision = application?.decisions.at(-1);

  if (isLoading) {
    return <p className="text-xs text-gray-600">Loading your application...</p>;
  }

  return (
    <>
      {error && (
        <div className="p-3 bg-red-50 border border-red-300 rounded-lg text-red-800 text-xs font-medium">
          {error.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Application Status" value={statusView.label} className={statusView.card} valueClass={statusView.value}>
          {application && <span className="text-[11px] font-medium opacity-80">Ref {application.ref}</span>}
        </Card>
        <Card
          title="Selected Programme"
          value={programmeName}
          className={application?.firstChoice ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-yellow-50 border-yellow-200 text-yellow-800'}
          valueClass={application?.firstChoice ? 'text-emerald-900' : 'text-yellow-900'}
        />
        <Card
          title="Payment Status"
          value={paymentLabel}
          className={feePaid ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-gray-50 border-gray-200 text-gray-700'}
          valueClass={feePaid ? 'text-emerald-900' : 'text-gray-900'}
        />
      </div>

      {latestDecision && (application?.status === 'queried' || application?.status === 'rejected') && (
        <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg text-orange-900 space-y-1">
          <h3 className="text-xs font-bold uppercase">Note from the admissions office</h3>
          <p className="text-xs">{latestDecision.comment || 'No further detail was given.'}</p>
          <p className="text-[11px] opacity-75">
            {latestDecision.officer} · {latestDecision.at.slice(0, 10)}
          </p>
        </div>
      )}

      <div className="p-6 border border-gray-200 rounded-lg bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-gray-900">{step.heading}</h2>
          <p className="text-xs text-gray-600">{step.detail}</p>
        </div>
        {step.action && (
          <Link
            to={step.action.to}
            className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-sm rounded-lg transition whitespace-nowrap"
          >
            {step.action.label}
          </Link>
        )}
      </div>
    </>
  );
}

function Card({
  title,
  value,
  className,
  valueClass,
  children,
}: {
  title: string;
  value: string;
  className: string;
  valueClass: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`p-4 border rounded-lg ${className}`}>
      <h3 className="text-xs font-semibold uppercase">{title}</h3>
      <p className={`text-base font-bold mt-1 ${valueClass}`}>{value}</p>
      {children}
    </div>
  );
}
