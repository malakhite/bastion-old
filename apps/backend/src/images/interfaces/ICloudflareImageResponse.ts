export interface ICloudflareImageResponse {
	result: {
		id: string;
		filename: string;
		uploaded: Date;
		requireSignedURLs: boolean;
		variants: string[];
	};
	result_info: string | null;
	success: boolean;
	errors: string[];
	messages: string[];
}
