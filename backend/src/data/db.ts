import mongoose from 'mongoose'

export async function connect() {
    await mongoose.connect(
        `${process.env.DB_CONN_STRING}/${process.env.DB_NAME}`
    )
}
