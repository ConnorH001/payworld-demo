import axios, { AxiosInstance } from 'axios';

// util types
interface PostArgs<T> {
	url: string;
	data?: T;
}

interface PatchArgs<T> {
	url: string;
	data?: T;
}

// domain types
export interface Payment {
	id: number;
	amount: string;
	recipientName: string;
	recipientBankName: string;
	recipientAccountNumber: string;
	status: 'pending' | 'approved';
}

export interface CreateAccountDto {
	name: string;
	address: string;
	phone: string;
	bankNumber: string;
}
export type UpdateAccountDto = Partial<CreateAccountDto>;

export interface Account {
	id: number;
	name: string;
	address: string;
	phone: string;
	bankNumber: string;
	organization: { id: string };
}

export interface CreatePaymentDto {
	amount: string;
	recipientName: string;
	recipientBankName: string;
	recipientAccountNumber: string;
}

interface LoginForm {
	email: string;
	password: string;
}

interface LoginResponse {
	id: string;
	email: string;
}

// API client
class Api {
	private static axiosInstance: AxiosInstance;

	static init() {
		Api.axiosInstance = axios.create({
			baseURL: 'http://localhost:8080',
			withCredentials: true,
		});
	}

	static async get<T>(url: string) {
		return Api.axiosInstance.get<T>(url);
	}

	static async post<R, D = undefined>({ url, data }: PostArgs<D>) {
		return data !== undefined
			? Api.axiosInstance.post<R>(url, data)
			: Api.axiosInstance.post<R>(url);
	}

	static async patch<R, D = undefined>({ url, data }: PatchArgs<D>) {
		return data !== undefined
			? Api.axiosInstance.patch<R>(url, data)
			: Api.axiosInstance.patch<R>(url);
	}
}

// auth endpoints

export const login = async (form: LoginForm) => {
	const { data } = await Api.post<LoginResponse, LoginForm>({
		url: '/auth/login',
		data: form,
	});
};

export const register = async (form: LoginForm) => {
	const { data } = await Api.post<LoginResponse, LoginForm>({
		url: '/auth/register',
		data: form,
	});
};

export const logout = async () => {
	await Api.post<null>({ url: '/auth/logout' });
};

// account endpoints

export const createAccount = async (
	form: CreateAccountDto,
): Promise<Account> => {
	const { data } = await Api.post<Account, CreateAccountDto>({
		url: '/accounts/create',
		data: form,
	});
	return data;
};

export const getAccountById = async (accountId: number): Promise<Account> => {
	const { data } = await Api.get<Account>(`/accounts/${accountId}`);
	return data;
};

export const updateAccount = async (
	accountId: number,
	payload: UpdateAccountDto,
): Promise<Account> => {
	const { data } = await Api.patch<Account, UpdateAccountDto>({
		url: `/accounts/${accountId}`,
		data: payload,
	});
	return data;
};

// payment endpoints

export const createPayment = async (
	accountId: number,
	payload: CreatePaymentDto,
): Promise<Payment> => {
	const { data } = await Api.post<Payment, CreatePaymentDto>({
		url: `/payments/account/${accountId}`,
		data: payload,
	});
	return data;
};

export const getPaymentsByAccount = async (
	accountId: number,
): Promise<Payment[]> => {
	const { data } = await Api.get<Payment[]>(`/accounts/${accountId}/payments`);
	return data;
};

export const approvePayment = async (
	paymentId: number,
	newStatus: 'approved',
) => {
	const { data } = await Api.patch<
		{ id: number; status: string },
		{ status: string }
	>({
		url: `/payments/${paymentId}/status`,
		data: { status: newStatus },
	});
	return data;
};

export default Api;
