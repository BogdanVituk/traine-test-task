import type { SuperHero } from '@/types';
import { Button } from './ui/button';

interface Props {
    existingImages: SuperHero['Images'],
    onDelete: (id: number) => void
}

function ExistingImages({existingImages, onDelete}: Props) {

  return (
    <>
       {existingImages.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Existing Images</p>
            <div className="flex gap-2 flex-wrap">
              {existingImages.map((item) => (
                <div key={item.id} className="flex flex-col items-center border p-1 rounded">
                  <img src={`${import.meta.env.VITE_API_URL}${item.url}`} alt="" className="w-20 h-20 object-cover" />
                  <Button type="button" variant="destructive" size="sm" className="mt-1" onClick={() => onDelete(item.id)}>
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
    </>
  )
}

export default ExistingImages;
