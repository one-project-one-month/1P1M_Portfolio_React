export const fieldConfig = [
  {
    id: 'user_type',
    label: 'User Type',
    order: 1,
    status: true,
    options: [
      {
        id: 'admin',
        label: 'Admin',
        order: 1,
        status: true,
      },
      {
        id: 'customer',
        label: 'Customer',
        order: 2,
        status: true,
      },
      {
        id: 'guest',
        label: 'Guest',
        order: 3,
        status: false,
      },
    ],
  },
  {
    id: 'account_status',
    label: 'Account Status',
    order: 2,
    status: true,
    options: [
      {
        id: 'active',
        label: 'Active',
        order: 1,
        status: true,
      },
      {
        id: 'inactive',
        label: 'Inactive',
        order: 2,
        status: true,
      },
    ],
  },
];
