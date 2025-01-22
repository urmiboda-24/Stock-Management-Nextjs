export interface ITransactionAttr {
  id: number;
  user_id: number;
  bill_title: string;
  issue_date: string;
  due_date: string;
  total: number;
  status: string;
}

export interface ITransactionPayload {
  bill_for: string;
  status: string;
  id: string;
}

export interface IPagination {
  search: string;
  sortBy: string;
  sortOrder: string;
  page: number;
  pageSize: number;
}

interface ITransaction {
  User: ITransactionAttr[];
  total: string;
}

export interface ITransactionResponse {
  success: boolean;
  status: number;
  data: ITransaction;
}
