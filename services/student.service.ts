import { Filters, StudentDetails } from "../types/student.types"
import { apiInstance } from "./axios.service"


export const getStudentList = (payload: Filters) => {
    return apiInstance.get(`students`, {params: payload}).then((res) => res.data.data as StudentDetails[])
}