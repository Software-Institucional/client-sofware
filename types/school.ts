export interface School {
  id: string
  name: string
  address: string
  phone: string
  imgUrl: string
  department: string
  municipality: string
  mail: string
  website: string
  sedes: Sede[]
}

export interface SchoolData {
  school: School
}

export interface Sede {
  id: string
  name: string
  address: string
  phone: string
  type: string
  capacity: number
  levels: string[]
}