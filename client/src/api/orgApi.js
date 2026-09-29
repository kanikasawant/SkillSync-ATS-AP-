const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_BASE_URL = `${BASE_URL.replace(/\/$/, '')}/api/organizations`;

export async function fetchOrganizations() {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to fetch organizations (${response.status})`);
  }
  const result = await response.json();
  return result.data;
}

export async function fetchOrganizationById(id) {
  const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(id)}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to fetch organization (${response.status})`);
  }
  const result = await response.json();
  return result.data;
}

export async function createOrganization(orgData) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orgData),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to create organization (${response.status})`);
  }
  const result = await response.json();
  return result.data;
}

export async function updateOrganization(id, orgData) {
  const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orgData),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to update organization (${response.status})`);
  }
  const result = await response.json();
  return result.data;
}

export async function deleteOrganization(id) {
  const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to delete organization (${response.status})`);
  }
  return await response.json();
}
