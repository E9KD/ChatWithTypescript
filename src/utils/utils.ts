export const SetStorage = (name: string, data: string) =>
  sessionStorage.setItem(name, data);

export const GetStorage = (name: string) => sessionStorage.getItem(name);
