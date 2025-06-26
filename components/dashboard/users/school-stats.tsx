// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { School } from "@/types/school";
// import { User } from "@/types/user";
// import { Users } from "lucide-react";

// interface SchoolStatsProps {
//   school: School;
//   users: User[];
// }

// export function SchoolStats({ school, users }: SchoolStatsProps) {
//   return (
//     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Total</CardTitle>
//           <Users className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{stats.total}</div>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Activos</CardTitle>
//           <CheckCircle className="h-4 w-4 text-green-600" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold text-green-600">
//             {stats.active}
//           </div>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Verificados</CardTitle>
//           <Mail className="h-4 w-4 text-blue-600" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold text-blue-600">
//             {stats.verified}
//           </div>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Docentes</CardTitle>
//           <Users className="h-4 w-4 text-purple-600" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold text-purple-600">
//             {stats.roles.DOCENTE || 0}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
