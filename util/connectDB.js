const { connections, connect } = require("mongoose")

const DBconnection  = async () => {
    try {
        if(connections[0].readyState) return
        await connect(process.env.MDBURI)
        console.log('connection to db was successful')

    } catch (error) {
        console.log('the connection failed')
        
    }
}
export default DBconnection;