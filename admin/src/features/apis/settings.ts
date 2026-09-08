import axiosInstance from "@/common/axiosInstance";

export async function getExchangeRate() { const response = await axiosInstance.get("/settings/exchange-rate"); return response.data.body as { usdToKhr: number }; }
export async function updateExchangeRate(usdToKhr: number) { const response = await axiosInstance.patch("/settings/exchange-rate", { usdToKhr }); return response.data.body as { usdToKhr: number }; }