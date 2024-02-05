<Table>
    <TableBody>
        {Array.isArray(reservations) && reservations.length > 0 ? (
            reservations.map((reservation) => (
                <TableRow key={reservation.id}>
                    <TableCell>{reservation.title}</TableCell>
                    <TableCell>{reservation.startDate.toLocaleString()}</TableCell>
                    <TableCell>{reservation.endDate.toLocaleString()}</TableCell>
                    <TableCell>{reservation.location}</TableCell>
                    <TableCell>
                        <Button onClick={() => handleEdit(reservation)}>Edit</Button>
                        <Button onClick={() => handleDelete(reservation)}>Delete</Button>
                    </TableCell>
                </TableRow>
            ))
        ) : (
            <TableRow>
                <TableCell colSpan={5}>No reservations available</TableCell>
            </TableRow>
        )}
    </TableBody>
</Table>