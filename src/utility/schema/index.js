import * as Yup from "yup";


export const SaleOrderSchema = Yup.object({
	No: Yup.number().min(1).required("Enter Product Number"),
	Item: Yup.string().min(2).required("Please Enter Item Name"),
	ItemCode: Yup.string().min(2).required("Please Enter Item Code"),
	MRP: Yup.number().min(1).required("Please Enter Amount "),
	QTY: Yup.number().min(1).required("Please Enter QTY"),
	Unit: Yup.string().required("Please Select Unit"),
	Amount: Yup.number().min(1).required("Eneter Vaild Amount"),
	
});

