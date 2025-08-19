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
import { useTourInfoQuery } from "../../redux/features/Tour/tour.api"
import { AddTourTypeModal } from "../../components/modules/Admin/AddTourType/AddTourTypeModal"
import { Button } from "../../components/ui/button"
import { Trash2 } from "lucide-react"

export function AddTourType() {
  const { data } = useTourInfoQuery(undefined)
  console.log(data)

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
        {data?.map((type: { _id: Key | null | undefined; name: string }) => (
          <TableRow key={type._id}>
            <TableCell className="font-medium w-full">{type.name}</TableCell>
            <TableCell className="text-right">
              <Button
                size="sm"
                variant="destructive"
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
