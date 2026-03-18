import { useState } from "react"

export function useAdminPageModel({ requests, selectedItems, setSelectedItems }: any) {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredRequests = requests.filter(req => {
        return (
            req.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.objectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.govCustomerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })

    const handleSelectAll = () => {
        if (selectedItems.length === filteredRequests.length) {
            setSelectedItems([])
        } else {
            setSelectedItems(filteredRequests.map(r => r.id))
        }
    }

    const handleSelectItem = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id))
        } else {
            setSelectedItems([...selectedItems, id])
        }
    }

    return {
        searchTerm,
        setSearchTerm,
        filteredRequests,
        handleSelectAll,
        handleSelectItem
    }
}