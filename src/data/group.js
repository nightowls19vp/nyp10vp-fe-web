import SuperUser from "../features/Group/SuperUser";

export const dataGroup = [
  {
    title: "SUPER USER",
    status: true,
    child: [
        {
            _id: 1,
            name: "Group 1",
            action: <SuperUser />,
        },
    ],
  },
  {
    title: "USER",
    status: false,
    child: [],
  },
];
