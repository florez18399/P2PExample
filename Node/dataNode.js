const axios = require('axios')
module.exports = {
    host: '',
    port: '',
    imageName: '',
    status: 'Disconnected',
    connect: function() {
        axios.post('http://localhost:3000/addHost', {
            host: this.host,
        }).then((response) => {
            this.status = 'Connected';
            console.log(response.data);
        }).catch((err) => {
            console.log(err.message);
        })
    }
}