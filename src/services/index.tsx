import { useMutation } from "@tanstack/react-query"

export const useRegister = () => {
    return useMutation(async (register: {}))
}