import { getStudentList } from "../services/student.service"
import { QUERY_CONSTANTS } from "../constants/query.constants"
import { useQuery } from "@tanstack/react-query"

 export const useGetStudentList = (page: string, limit: string, name: string, age: string) => {
    return useQuery({
      queryKey: [QUERY_CONSTANTS.STUDENTS, page, limit, name, age],
      queryFn: () => getStudentList({ page, limit, name, age }),
    });
 }