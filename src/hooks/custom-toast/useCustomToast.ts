import { ToastId, useToast, UseToastOptions, CloseAllToastsOptions } from '@chakra-ui/react'

type UseCustomToast = {
  (options?: UseToastOptions | undefined): string | number | undefined
  close: (id: ToastId) => void
  closeAll: (options?: CloseAllToastsOptions | undefined) => void
  update(id: ToastId, options: any): void
  isActive: (id: ToastId) => boolean | undefined
}
export const useCustomToast = (): UseCustomToast => {
  return useToast({
    isClosable: true,
    variant: 'subtle',
    position: 'bottom',
  })
}
