import { MOCK_ADMIN_OVERVIEW, MOCK_APPLICATIONS } from './mock-data';

// The officer/admin endpoints do not exist yet, so these return mock data.
// When the backend is ready, replace the bodies with api.get(...) calls;
// the dashboards only depend on the return types.

export const fetchOfficerApplications = async () => MOCK_APPLICATIONS;

export const fetchAdminOverview = async () => MOCK_ADMIN_OVERVIEW;
