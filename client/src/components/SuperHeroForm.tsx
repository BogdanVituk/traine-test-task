import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../hooks";
import { createSuperHero, updateSuperHero, deleteSuperHeroImg } from "../slices/superheroSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { superHeroSchema, type FormValues } from "@/shemas/shems";
import type { SuperHero } from "@/types";
import ExistingImages from "./ExistingImages";

interface SuperheroFormProps {
  onClose: (val: boolean) => void;
}

const SuperheroForm = ({ onClose }: SuperheroFormProps) => {


  const { error, loading, selectedSuperhero } = useAppSelector(state => state.superheros)

    const isEditMode = !!selectedSuperhero;

  const dispatch = useAppDispatch();

  const [images, setImages] = useState<File[]>([]);
  const [urlsImages, setUrlImages] = useState<string[]>([]);

  const [existingImages, setExistingImages] = useState<SuperHero["Images"]>(selectedSuperhero?.Images || []);

  const form = useForm<FormValues>({
    resolver: zodResolver(superHeroSchema),
    defaultValues: {
      real_name: selectedSuperhero?.real_name || "",
      nickname: selectedSuperhero?.nickname || "",
      superpowers: selectedSuperhero?.superpowers || "",
      catch_phrase: selectedSuperhero?.catch_phrase || "",
      origin_description: selectedSuperhero?.origin_description || "",
    },
  });

  useEffect(() => {

    return () => {
      urlsImages.forEach(url => URL.revokeObjectURL(url))
    }
  }, [urlsImages])

  const onSubmit = async (data: FormValues) => {

    const fd = new FormData();


    Object.entries(data).forEach(([key, value]) => fd.append(key, value));


    if (images.length) {
      images.forEach((file) => fd.append("images", file));
    }

    try {

      if (isEditMode) {
        await dispatch(updateSuperHero({ id: selectedSuperhero.id, body: fd })).unwrap();
        // onClose(false);
        // form.reset();
      } else {
        await dispatch(createSuperHero(fd)).unwrap();
      }

    } catch (error) {
      console.log(error)
    }
  };

  const handleFileChange = (files: FileList | null) => {

    if (!files) return;

    const newFiles = Array.from(files);
    const urls = newFiles.map((file) => URL.createObjectURL(file));

    setUrlImages((prev) => [...prev, ...urls]);
    setImages((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setUrlImages((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExisting = (imageId: number) => {
    dispatch(deleteSuperHeroImg(imageId));
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {(["real_name", "nickname", "superpowers", "origin_description", "catch_phrase"] as const).map((fieldName) => (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">{fieldName.replace("_", " ")}</FormLabel>
                <FormControl>
                  <Input placeholder={`Enter ${fieldName.replace("_", " ")}`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}


        {isEditMode && <ExistingImages existingImages={existingImages} onDelete={removeExisting} />}


        <FormItem>
          <FormLabel>Add Images</FormLabel>
          <FormControl>
            <Input type="file" multiple accept="image/*" onChange={(e) => handleFileChange(e.target.files)} />
          </FormControl>
          <div className="flex gap-2 mt-2 flex-wrap">
            {urlsImages.map((src, index) => (
              <div key={index} className="flex flex-col items-center border p-1 rounded">
                <img src={src} alt="preview" className="w-20 h-20 object-cover" />
                <Button type="button" variant="destructive" size="sm" className="mt-1" onClick={() => removeFile(index)}>
                  Cancel
                </Button>
              </div>
            ))}
          </div>
        </FormItem>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Saving..." : isEditMode ? "Update Superhero" : "Create Superhero"}
        </Button>

        {error && error}
      </form>
    </Form>
  );
};

export default SuperheroForm;