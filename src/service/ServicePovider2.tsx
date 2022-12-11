import { createContext, useContext } from "react";

// import { BookService } from "@/types";

// const ServiceCtx = createContext<Service>({} as Service);

// export const useService = () => useContext(ServiceCtx);

// interface Service {
//   bookService: BookService;
// }

interface ServiceProviderProps {
  children: React.ReactNode;
  // services: Service;
}
// const ServiceProvider = ({ children, services }: ServiceProviderProps) => {
//   return <ServiceCtx.Provider value={services}>{children}</ServiceCtx.Provider>;
// };

// export default ServiceProvider;
