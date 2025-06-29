"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, X, Plus, Building2, MapPin, Phone, Users, GraduationCap, Trash2, ImageIcon } from "lucide-react"

interface Sede {
  id: string
  name: string
  address: string
  phone: string
  type: string
  capacity: number
  levels: string[]
}

interface Institution {
  id?: string
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

interface InstitutionFormProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  institution?: Institution | null
  mode: "create" | "edit"
  onSave: (institution: Institution) => void
}

const DEPARTMENTS = [
  "AMAZONAS",
  "ANTIOQUIA",
  "ARAUCA",
  "ATLÁNTICO",
  "BOLÍVAR",
  "BOYACÁ",
  "CALDAS",
  "CAQUETÁ",
  "CASANARE",
  "CAUCA",
  "CESAR",
  "CHOCÓ",
  "CÓRDOBA",
  "CUNDINAMARCA",
  "GUAINÍA",
  "GUAVIARE",
  "HUILA",
  "LA GUAJIRA",
  "MAGDALENA",
  "META",
  "NARIÑO",
  "NORTE DE SANTANDER",
  "PUTUMAYO",
  "QUINDÍO",
  "RISARALDA",
  "SAN ANDRÉS Y PROVIDENCIA",
  "SANTANDER",
  "SUCRE",
  "TOLIMA",
  "VALLE DEL CAUCA",
  "VAUPÉS",
  "VICHADA",
]

const SEDE_TYPES = ["PRINCIPAL", "URBANA", "RURAL", "NOCTURNA"]

const EDUCATION_LEVELS = ["PREESCOLAR", "PRIMARIA", "SECUNDARIA", "MEDIA", "TÉCNICA", "UNIVERSITARIA"]

const institutionFormSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  address: z.string().min(5, {
    message: "La dirección debe tener al menos 5 caracteres.",
  }),
  phone: z.string().min(7, {
    message: "El teléfono debe tener al menos 7 caracteres.",
  }),
  mail: z.string().email({
    message: "Por favor ingresa un email válido.",
  }),
  website: z.string().url().optional().or(z.literal("")),
  department: z.string().min(1, {
    message: "Por favor selecciona un departamento.",
  }),
  municipality: z.string().min(2, {
    message: "El municipio debe tener al menos 2 caracteres.",
  }),
  imgUrl: z.string().optional(),
})

const sedeFormSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  address: z.string().min(5, {
    message: "La dirección debe tener al menos 5 caracteres.",
  }),
  phone: z.string().min(7, {
    message: "El teléfono debe tener al menos 7 caracteres.",
  }),
  type: z.string().min(1, {
    message: "Por favor selecciona un tipo de sede.",
  }),
  capacity: z.number().min(1, {
    message: "La capacidad debe ser mayor a 0.",
  }),
  levels: z.array(z.string()).min(1, {
    message: "Selecciona al menos un nivel educativo.",
  }),
})

type InstitutionFormValues = z.infer<typeof institutionFormSchema>
type SedeFormValues = z.infer<typeof sedeFormSchema>

export function InstitutionForm({ isOpen, onOpenChange, institution, mode, onSave }: InstitutionFormProps) {
  const [imagePreview, setImagePreview] = useState<string>(institution?.imgUrl || "")
  const [sedes, setSedes] = useState<Sede[]>(institution?.sedes || [])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const institutionForm = useForm<InstitutionFormValues>({
    resolver: zodResolver(institutionFormSchema),
    defaultValues: {
      name: institution?.name || "",
      address: institution?.address || "",
      phone: institution?.phone || "",
      mail: institution?.mail || "",
      website: institution?.website || "",
      department: institution?.department || "",
      municipality: institution?.municipality || "",
      imgUrl: institution?.imgUrl || "",
    },
  })

  const sedeForm = useForm<SedeFormValues>({
    resolver: zodResolver(sedeFormSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      type: "",
      capacity: 0,
      levels: [],
    },
  })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        institutionForm.setValue("imgUrl", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onAddSede = (values: SedeFormValues) => {
    const sede: Sede = {
      ...values,
      id: Date.now().toString(),
    }
    setSedes([...sedes, sede])
    sedeForm.reset()
  }

  const handleRemoveSede = (sedeId: string) => {
    setSedes(sedes.filter((sede) => sede.id !== sedeId))
  }

  const onSubmitInstitution = (values: InstitutionFormValues) => {
    // const institutionData: Institution = {
    //   ...values,
    //   imgUrl: imagePreview,
    //   sedes: sedes,
    // }
    // onSave(institutionData)
  }

  const getSedeTypeColor = (type: string) => {
    switch (type) {
      case "PRINCIPAL":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "RURAL":
        return "bg-green-100 text-green-800 border-green-200"
      case "URBANA":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "NOCTURNA":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Crear Nueva Institución" : "Editar Institución"}</DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Completa la información de la nueva institución educativa"
              : "Modifica la información de la institución"}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">Información General</TabsTrigger>
            <TabsTrigger value="sedes">Sedes</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6 mt-6">
            <Form {...institutionForm}>
              <form onSubmit={institutionForm.handleSubmit(onSubmitInstitution)} className="space-y-6">
                {/* Imagen de la institución */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Imagen de la Institución</h3>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {imagePreview ? (
                        <div className="relative">
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg border"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg?height=128&width=128"
                            }}
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={() => {
                              setImagePreview("")
                              institutionForm.setValue("imgUrl", "")
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        Subir Imagen
                      </Button>
                      <p className="text-sm text-muted-foreground">Formatos: JPG, PNG, GIF. Tamaño máximo: 5MB</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                <Separator />

                {/* Información básica */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Información Básica</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={institutionForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre de la Institución *</FormLabel>
                          <FormControl>
                            <Input placeholder="Nombre completo de la institución" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={institutionForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dirección *</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Dirección completa de la institución" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={institutionForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Teléfono *</FormLabel>
                            <FormControl>
                              <Input placeholder="Número de teléfono" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={institutionForm.control}
                        name="mail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="correo@institucion.edu.co" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={institutionForm.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sitio Web</FormLabel>
                          <FormControl>
                            <Input placeholder="https://www.institucion.edu.co" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Separator />

                {/* Ubicación */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Ubicación</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={institutionForm.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Departamento *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar departamento" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {DEPARTMENTS.map((dept) => (
                                <SelectItem key={dept} value={dept}>
                                  {dept}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={institutionForm.control}
                      name="municipality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Municipio *</FormLabel>
                          <FormControl>
                            <Input placeholder="Nombre del municipio" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <DialogFooter className="gap-2 mt-6">
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">{mode === "create" ? "Crear Institución" : "Guardar Cambios"}</Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="sedes" className="space-y-6 mt-6">
            {/* Sedes existentes */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Sedes Registradas ({sedes.length})</h3>
              {sedes.length > 0 ? (
                <div className="space-y-3">
                  {sedes.map((sede) => (
                    <Card key={sede.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{sede.name}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge className={getSedeTypeColor(sede.type)}>{sede.type}</Badge>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveSede(sede.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{sede.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{sede.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Capacidad: {sede.capacity}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Niveles: {sede.levels.length}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {sede.levels.map((level) => (
                            <Badge key={level} variant="secondary" className="text-xs">
                              {level}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No hay sedes registradas</p>
                  <p className="text-sm">Agrega la primera sede de la institución</p>
                </div>
              )}
            </div>

            <Separator />

            {/* Agregar nueva sede */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Agregar Nueva Sede</h3>
              <Form {...sedeForm}>
                <form onSubmit={sedeForm.handleSubmit(onAddSede)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={sedeForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre de la Sede</FormLabel>
                          <FormControl>
                            <Input placeholder="Ej: Sede Principal" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={sedeForm.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Sede</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {SEDE_TYPES.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={sedeForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dirección</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Dirección completa de la sede" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={sedeForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono</FormLabel>
                          <FormControl>
                            <Input placeholder="Teléfono de la sede" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={sedeForm.control}
                      name="capacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Capacidad</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Número de estudiantes"
                              {...field}
                              onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={sedeForm.control}
                    name="levels"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Niveles Educativos</FormLabel>
                        <FormDescription>Selecciona los niveles educativos que ofrece esta sede</FormDescription>
                        <div className="flex flex-wrap gap-2">
                          {EDUCATION_LEVELS.map((level) => (
                            <Badge
                              key={level}
                              variant={field.value.includes(level) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => {
                                const currentLevels = field.value
                                const updatedLevels = currentLevels.includes(level)
                                  ? currentLevels.filter((l) => l !== level)
                                  : [...currentLevels, level]
                                field.onChange(updatedLevels)
                              }}
                            >
                              {level}
                            </Badge>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Agregar Sede
                  </Button>
                </form>
              </Form>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
