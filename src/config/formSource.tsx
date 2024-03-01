"use strict";
export const userColumns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params: any) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "address",
    headerName: "Address",
    width: 230,
  },
];

export const productColumns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
    renderCell: (params: any) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.title}
        </div>
      );
    },
  },
  {
    field: "category",
    headerName: "Category",
    width: 230,
  },
  {
    field: "price",
    headerName: "Price",
    width: 230,
  },
  {
    field: "description",
    headerName: "Description",
    width: 230,
  },
];
