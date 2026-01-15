import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { superHeroSchema, type FormValues } from "@/shemas/shema";
import type { SuperHero } from "@/types";
import ExistingImages from "./ExistingImages";
import { useAddSuperHeroMutation, useDeleteSuperHeroImageMutation, useUpdateSuperHeroMutation } from "@/store/superHeroApi";

interface SuperheroFormProps {
  onClose: () => void;
  mode: "create" | 'edit';
  hero?: SuperHero
}

const SuperheroForm = ({ onClose, mode, hero }: SuperheroFormProps) => {

  const [addSuperHero, { isLoading }] = useAddSuperHeroMutation();
  const [updateSuperHero, { isLoading: isUpdateLoading }] = useUpdateSuperHeroMutation();
  const [deleteSuperHeroImage] = useDeleteSuperHeroImageMutation();


  const [images, setImages] = useState<File[]>([]);
  const [urlsImages, setUrlImages] = useState<string[]>([]);

  const [existingImages, setExistingImages] = useState<SuperHero["Images"]>(hero?.Images || []);

  const form = useForm<FormValues>({
    resolver: zodResolver(superHeroSchema),
    defaultValues: {
      real_name: "",
      nickname: "",
      superpowers: "",
      catch_phrase: "",
      origin_description: "",
    },
  });

  useEffect(() => {
    if (mode == "edit" && hero) {
      form.reset({
        real_name: hero.real_name,
        nickname: hero.nickname,
        superpowers: hero.superpowers,
        catch_phrase: hero.catch_phrase,
        origin_description: hero.origin_description,
      });
      setExistingImages(hero.Images || []);
    } else {
      form.reset();
      setExistingImages([]);
      setImages([]);
      setUrlImages([]);
    }
  }, [mode, hero]);


  const onSubmit = async (data: FormValues) => {

    const fd = new FormData();

    Object.entries(data).forEach(([key, value]) => fd.append(key, value));

    if (images.length) {
      images.forEach((file) => fd.append("images", file));
    }

    try {
      if (mode === 'edit') {
        if (hero)
          await updateSuperHero({ id: hero.id, body: fd }).unwrap();
      } else {
        await addSuperHero(fd).unwrap();
      }

      onClose();
      form.reset();

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
    URL.revokeObjectURL(urlsImages[index]);
    setUrlImages((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExisting = async (imageId: number) => {
     try {

      await deleteSuperHeroImage(imageId).unwrap();
      setExistingImages((prev) => prev.filter((img) => img.id !== imageId));

    } catch (e) {
      console.log(e);
    }
  };

  const isSaving = isLoading || isUpdateLoading;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-disabled={isSaving}>

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


        {mode == 'edit' && <ExistingImages existingImages={existingImages} onDelete={removeExisting} />}


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

        <Button type="submit" className="w-full" disabled={isSaving}>
          {isSaving ? "Saving..." : mode == 'edit' ? "Update Superhero" : "Create Superhero"}
        </Button>
      </form>
    </Form>
  );
};

export default SuperheroForm;