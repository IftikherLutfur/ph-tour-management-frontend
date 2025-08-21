import type { Key } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import {useRemoveTourTypeMutation, useTourInfoQuery } from "../../redux/features/Tour/tour.api"
import { AddTourTypeModal } from "../../components/modules/Admin/AddTourType/AddTourTypeModal"
import { Button } from "../../components/ui/button"
import { Trash2 } from "lucide-react"
import  {DeleteTourTypeModule}  from "../../components/modules/Admin/AddTourType/DeleteTourType"
import { toast } from "sonner"

export function AddTourType() {
  const { data } = useTourInfoQuery(undefined)
  const [removeTourType] = useRemoveTourTypeMutation()

  const handleRemoveTypes = async(id : string) =>{
    const removeType = await removeTourType(id).unwrap();
    if(removeType.succes){
      toast.success("Tour type has been deleted")
    }
    console.log(removeType)
  }

  return (
    <Table>
      <TableCaption>A list of tour types</TableCaption>

      {/* Header */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px] text-lg font-semibold">
            Tour Type
          </TableHead>
          <TableHead className="text-right">
            <AddTourTypeModal />
          </TableHead>
        </TableRow>
      </TableHeader>

      {/* Body */}
      <TableBody>
        {data?.map((type: { _id: Key | null | undefined| string; name: string }) => (
          <TableRow key={type._id}>
            <TableCell className="font-medium w-full">{type.name}</TableCell>
            <TableCell className="text-right">
              <DeleteTourTypeModule onConfirm={() => typeof type._id === "string" ? handleRemoveTypes(type._id) : undefined}>
              <Button
            
                size="sm"
                variant="destructive"
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
              </DeleteTourTypeModule>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
