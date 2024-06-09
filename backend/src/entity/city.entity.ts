import { Schema, model } from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()

export interface City {
    name: string
    name_native: string
    country: string
    continent: string
    latitude: number
    longitude: number
    population: number
    founded: number
    landmarks: string[]
}

const CitySchema = new Schema<City>({
    name: { type: String, required: true },
    name_native: { type: String, required: true },
    country: { type: String, required: true },
    continent: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    population: { type: Number, required: true },
    founded: { type: Number, required: true },
    landmarks: { type: [String], required: true },
})

export const CityModel = model('City', CitySchema)
