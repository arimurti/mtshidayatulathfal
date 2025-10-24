import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const submission = await db.formSubmission.delete({
      where: {
        id: id
      }
    })

    return NextResponse.json(
      { 
        message: 'Data berhasil dihapus',
        data: submission 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting form submission:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menghapus data' },
      { status: 500 }
    )
  }
}