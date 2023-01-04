declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CRM_USERNAME: string;
      CRM_PASSWORD: string;
    }
  }
}

export {};
