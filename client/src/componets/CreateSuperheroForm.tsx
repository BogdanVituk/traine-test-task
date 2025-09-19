import { useForm } from "react-hook-form"
import { useAppDispatch } from "../hooks"
import { createSuperHero } from "../slices/superheroSlice"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export type createSuperHeroType = {
    real_name: string
    nickname: string
    superpowers: string
    catch_phrase: string
    origin_description: string
    images: FileList
}

const formSchema = z.object({
  real_name: z.string().min(2, {
    message: "Real name must be at least 4 characters.",
  }),
  nickname: z.string().min(2, {
    message: "Nickname must be at least 3 characters.",
  }),
  superpowers: z.string().min(4, {
    message: "Superpowers must be at least 4 characters.",
  }),
  catch_phrase: z.string().min(3, {
    message: "Catch phrase must be at least 3 characters.",
  }),
  origin_description: z.string().min(5, {
    message: "Origin description must be at least 5 characters.",
  })
})

interface CreateSuperHeroFormProps {
    onClose: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateSuperheroForm = ({onClose}: CreateSuperHeroFormProps) => {
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

    const [images, setImages] = useState<File[]>([]);
    const [urlsImages, setUrlImages] = useState<string[]>([])
    const dispatch = useAppDispatch()

     const onSubmit = (data: z.infer<typeof formSchema>) => {

      const fd = new FormData()

      Object.entries(data).forEach(([key, value]) => {
        fd.append(key, value as string); 
       });

      if (images?.length) {
        Array.from(images).forEach(file => fd.append('images', file));
      } 

      dispatch(createSuperHero(fd))
      onClose(false)
      form.reset();
     }

     const handleFileChange = (files: FileList | null) => {

      if(!files) return

      const newFiles = Array.from(files); 

      const urls = newFiles.map(file => URL.createObjectURL(file))
      setUrlImages(prev => [...prev, ...urls])
      setImages(prev => [...prev, ...newFiles])
      console.log(images)
     }


     const removeFile = (index: number) => {
      setUrlImages(urlsImages.filter((_,i) => i != index))
      setImages((prev) => prev.filter((_, i) => i !== index));
     }

    return (

       <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="real_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Real name</FormLabel>
                <FormControl>
                  <Input placeholder="Real name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your superhero real name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nickname</FormLabel>
                <FormControl>
                  <Input placeholder="Nickname" {...field} />
                </FormControl>
                <FormDescription>
                  This is your superhero nickname.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="superpowers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Superpowers</FormLabel>
                <FormControl>
                  <Input placeholder="Superpowers" {...field} />
                </FormControl>
                <FormDescription>
                  This is your superhero superpowers.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="origin_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Origin description</FormLabel>
                <FormControl>
                  <Input placeholder="Origin description" {...field} />
                </FormControl>
                <FormDescription>
                  This is your superhero origin description.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="catch_phrase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catch phrase</FormLabel>
                <FormControl>
                  <Input placeholder="Enter catch phrase" {...field} />
                </FormControl>
                <FormDescription>
                  This is your superhero catch phrase.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Images</FormLabel>
            <FormControl>
              <Input 
              type="file" 
              multiple 
              accept="image/*"
              placeholder="Pick imgs" 
              onChange={(e) => handleFileChange(e.target.files)} 
              />
            </FormControl>
            <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormMessage />
          </FormItem>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: 10 }}>
          {urlsImages.map((src, index) => (
            <div className="flex-col flex justify-center items-center">
              <img key={index} src={src} alt="preview" width={120} height={80} style={{ objectFit: 'cover' }} />
              <Button className="mt-2" onClick={() => removeFile(index)} >Відминити</Button>
            </div>
          ))}
        </div>
          <Button type="submit">Submit</Button>
        </form>
    </Form>

    )
}

export default CreateSuperheroForm;