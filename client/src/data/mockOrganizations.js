export const INITIAL_ORGANIZATIONS = [
  {
    id: "org_9b8f2c1e-a4d3-45",
    name: "Acme Corporation",
    shortName: "Acme Corp",
    domain: "acmecorp.com",
    shortDomain: "acme.co",
    letter: "A",
    logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150",
    plan: "Enterprise",
    status: "Active",
    recruiterSeats: { current: 40, max: 50 },
    createdDate: "Oct 12, 2022",
    billingEmail: "billing@acmecorp.com",
    admin: { name: "Jane Doe", email: "jane@acmecorp.com" },
    metrics: {
      activeJobs: 142,
      maxJobs: 250,
      candidates: "12.5k",
      candidatesGrowth: "+15% this month",
      geminiTokens: "8.2M",
      tokensCost: "$24.60 est.",
      tokensProgress: 82
    },
    quotas: {
      monthlyApiRequests: { current: "450k", max: "1M", percent: 45 },
      provisionedSeats: { current: 12, max: 20, percent: 60 },
      storageCapacity: { current: "85GB", max: "100GB", percent: 85 }
    },
    recruiters: [
      { id: "rec_1", name: "Jane Doe", email: "jane@acmecorp.com", role: "Org Admin", status: "Active", joined: "Oct 12, 2022" },
      { id: "rec_2", name: "Marcus Vance", email: "marcus@acmecorp.com", role: "Senior Recruiter", status: "Active", joined: "Nov 01, 2022" },
      { id: "rec_3", name: "Elena Rostova", email: "elena@acmecorp.com", role: "Technical Recruiter", status: "Active", joined: "Jan 15, 2023" },
      { id: "rec_4", name: "David Kim", email: "david.k@acmecorp.com", role: "Recruiter", status: "Active", joined: "Mar 04, 2023" }
    ],
    auditLogs: [
      { id: "log_1", action: "Subscription Plan upgraded to Enterprise", user: "Jane Doe", timestamp: "2026-08-10 14:22", ip: "192.168.1.45" },
      { id: "log_2", action: "Added 10 new recruiter seats", user: "Super Admin", timestamp: "2026-07-28 09:15", ip: "10.0.0.1" },
      { id: "log_3", action: "API Quota limit updated to 1M requests/mo", user: "Super Admin", timestamp: "2026-06-14 11:05", ip: "10.0.0.1" }
    ]
  },
  {
    id: "org_3a1d9c82-b7e1-88",
    name: "Global Tech",
    shortName: "Global Tech",
    domain: "globaltech.io",
    shortDomain: "globaltech.io",
    letter: "G",
    logoUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150",
    plan: "Growth",
    status: "Suspended",
    recruiterSeats: { current: 10, max: 10 },
    createdDate: "Jan 05, 2023",
    billingEmail: "billing@globaltech.io",
    admin: { name: "Robert Chen", email: "robert@globaltech.io" },
    metrics: {
      activeJobs: 45,
      maxJobs: 50,
      candidates: "4.2k",
      candidatesGrowth: "+8% this month",
      geminiTokens: "3.1M",
      tokensCost: "$9.30 est.",
      tokensProgress: 62
    },
    quotas: {
      monthlyApiRequests: { current: "280k", max: "500k", percent: 56 },
      provisionedSeats: { current: 10, max: 10, percent: 100 },
      storageCapacity: { current: "42GB", max: "50GB", percent: 84 }
    },
    recruiters: [
      { id: "rec_5", name: "Robert Chen", email: "robert@globaltech.io", role: "Org Admin", status: "Suspended", joined: "Jan 05, 2023" },
      { id: "rec_6", name: "Sarah Miller", email: "sarah@globaltech.io", role: "Recruiter", status: "Suspended", joined: "Feb 10, 2023" }
    ],
    auditLogs: [
      { id: "log_4", action: "Account suspended due to billing delinquency", user: "System Guard", timestamp: "2026-09-01 00:00", ip: "Internal" }
    ]
  },
  {
    id: "org_7f4b2a11-e902-12",
    name: "Startup Inc",
    shortName: "Startup Inc",
    domain: "startup.com",
    shortDomain: "startup.com",
    letter: "S",
    logoUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150",
    plan: "Starter",
    status: "Cancelled",
    recruiterSeats: { current: 2, max: 5 },
    createdDate: "Mar 22, 2023",
    billingEmail: "finance@startup.com",
    admin: { name: "Sarah Jenkins", email: "sarah@startup.com" },
    metrics: {
      activeJobs: 3,
      maxJobs: 10,
      candidates: "650",
      candidatesGrowth: "0% this month",
      geminiTokens: "420K",
      tokensCost: "$1.26 est.",
      tokensProgress: 20
    },
    quotas: {
      monthlyApiRequests: { current: "15k", max: "100k", percent: 15 },
      provisionedSeats: { current: 2, max: 5, percent: 40 },
      storageCapacity: { current: "4GB", max: "10GB", percent: 40 }
    },
    recruiters: [
      { id: "rec_7", name: "Sarah Jenkins", email: "sarah@startup.com", role: "Org Admin", status: "Inactive", joined: "Mar 22, 2023" }
    ],
    auditLogs: [
      { id: "log_5", action: "Subscription cancelled by user", user: "Sarah Jenkins", timestamp: "2026-05-18 16:40", ip: "172.56.21.9" }
    ]
  },
  {
    id: "org_5e82a901-f112-99",
    name: "Apex Health Group",
    shortName: "Apex Health",
    domain: "apexhealth.org",
    shortDomain: "apexhealth.org",
    letter: "A",
    logoUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=150",
    plan: "Enterprise",
    status: "Active",
    recruiterSeats: { current: 28, max: 35 },
    createdDate: "Jun 18, 2023",
    billingEmail: "accounts@apexhealth.org",
    admin: { name: "Michael Vance", email: "mvance@apexhealth.org" },
    metrics: {
      activeJobs: 89,
      maxJobs: 150,
      candidates: "9.8k",
      candidatesGrowth: "+22% this month",
      geminiTokens: "6.4M",
      tokensCost: "$19.20 est.",
      tokensProgress: 75
    },
    quotas: {
      monthlyApiRequests: { current: "620k", max: "800k", percent: 77 },
      provisionedSeats: { current: 28, max: 35, percent: 80 },
      storageCapacity: { current: "68GB", max: "100GB", percent: 68 }
    },
    recruiters: [
      { id: "rec_8", name: "Michael Vance", email: "mvance@apexhealth.org", role: "Org Admin", status: "Active", joined: "Jun 18, 2023" }
    ],
    auditLogs: [
      { id: "log_6", action: "Provisioned 15 Recruiter Seats", user: "Michael Vance", timestamp: "2026-07-02 10:11", ip: "198.51.100.2" }
    ]
  },
  {
    id: "org_11aa33bb-cc44-55",
    name: "Nexus Artificial Intelligence",
    shortName: "Nexus AI",
    domain: "nexusai.dev",
    shortDomain: "nexusai.dev",
    letter: "N",
    logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150",
    plan: "Growth",
    status: "Active",
    recruiterSeats: { current: 8, max: 15 },
    createdDate: "Nov 03, 2023",
    billingEmail: "billing@nexusai.dev",
    admin: { name: "Priya Sharma", email: "priya@nexusai.dev" },
    metrics: {
      activeJobs: 31,
      maxJobs: 50,
      candidates: "3.1k",
      candidatesGrowth: "+12% this month",
      geminiTokens: "5.8M",
      tokensCost: "$17.40 est.",
      tokensProgress: 68
    },
    quotas: {
      monthlyApiRequests: { current: "390k", max: "500k", percent: 78 },
      provisionedSeats: { current: 8, max: 15, percent: 53 },
      storageCapacity: { current: "22GB", max: "50GB", percent: 44 }
    },
    recruiters: [
      { id: "rec_9", name: "Priya Sharma", email: "priya@nexusai.dev", role: "Org Admin", status: "Active", joined: "Nov 03, 2023" }
    ],
    auditLogs: [
      { id: "log_7", action: "Organization Onboarded", user: "Super Admin", timestamp: "2023-11-03 08:00", ip: "10.0.0.1" }
    ]
  }
];
