import repository from '../repository.js';

class AdminRepository {
    async post() {
        try {
            const response = await repository.get('/all-post');
            return response;
        } catch (error) {
            return error;
        }
    }

     async alluser() {
        try {
            const response = await repository.get('/all-users');
            return response;
        } catch (error) {
            return error;
        }
    }
     async getsetting() {
        try {
            const response = await repository.get('/setting');
            return response;
        } catch (error) {
            return error;
        }
    }
    
}

export default new AdminRepository(); // Exporting an instance
