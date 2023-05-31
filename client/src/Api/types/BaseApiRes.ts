type ResponseMessage = {
  message: string
}

export type BaseApiRes<T = undefined> = (T extends undefined ? {} : T) & ResponseMessage
