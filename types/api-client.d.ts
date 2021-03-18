type CustomRequestInit = Omit<RequestInit, 'method'> & { params?: object }
