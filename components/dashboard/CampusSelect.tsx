// "use client";

// // import { useAppStore } from "@/lib/store/useAppStore";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";

// export default function CampusSelect() {
//   // const { campuses, authUser } = useAppStore();

//   // if (authUser?.role !== "main_admin") return null;

//   return (
//     <Select>
//       <SelectTrigger className="w-37.5">
//         <SelectValue placeholder="Select a campus" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           <SelectLabel>Campuse</SelectLabel>
//           <SelectItem value="">All Campuses</SelectItem>
//           {campuses.map((campus) => (
//             <SelectItem key={campus.id} value={campus.id}>
//               {campus.branchName}
//             </SelectItem>
//           ))}
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   );
// }
