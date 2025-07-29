export const statusCodesError = (response, expectedStatus) => {
    if (response.status !== expectedStatus) {
        let error = new Error(`Mauvais status code : ${response.status}`);
        error.status = response.status;
        error.response = response;
        throw error;
    }
}