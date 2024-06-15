// export async function POST(request: Request) {
//   const res = await request.json();
//   const token = res?.accessToken;
//   if (!token) {
//     return Response.json(
//       {
//         message: "Không nhận được Access Token!",
//       },
//       {
//         status: 400,
//       }
//     );
//   }
//   return Response.json(
//     { res },
//     {
//       status: 200,
//       headers: { "Set-Cookie": `token=${token}` },
//     }
//   );
// }

export async function POST(request: Request) {
  const res = await request.json();
  const token = res?.token;
  return Response.json(
    { res },
    {
      status: 200,
      headers: { "Set-Cookie": `token=${token}` },
    }
  );
}
