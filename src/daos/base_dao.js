class BaseDAO {
    constructor(schema) {
        this.schema = schema
    }
    // async getRecordById(id) {
    //     const record = await this.schema.findById(id)
    //     return record
    // }
    async insertRecord(recordData) {
        const record = new this.schema(recordData)
        await record.save()
        return record
    }
    // async updateRecord(record) {
    //     await record.save()
    // }
    // async deleteRecordById(id) {
    //     await this.schema.findByIdAndDelete(id)
    // }
}

export default BaseDAO
