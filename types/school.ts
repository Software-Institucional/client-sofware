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
}

export interface SchoolData {
  school: School
}