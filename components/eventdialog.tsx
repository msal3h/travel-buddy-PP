import * as React from 'react';
import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, MenuItem } from "@mui/material";
import CreatedBy from './createdby';

interface EventDialogProps {
    tripId: string;
    onEventAdded?: () => void;
}

export default function EventDialog({ tripId, onEventAdded }: EventDialogProps) {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [eventType, setEventType] = useState("");
    const [loading, setLoading] = useState(false);

    // Form data state
    const [formData, setFormData] = useState({
        flightnumber: "",
        flightdeparture: "",
        flightarrival: "",
        flightduration: "",
        flightairline: "",
        flightnotes: "",
        activityname: "",
        activitylocation: "",
        activitytime: "",
        activitynotes: "",
        accomodationname: "",
        accomodationcheckin: "",
        accomodationcheckout: "",
        accomodationlocation: "",
        accomodationnotes: "",
    });

    const handleOpen = () => {
        setOpen(true);
        setStep(0);
        setEventType("");
        // Reset form
        setFormData({
            flightnumber: "",
            flightdeparture: "",
            flightarrival: "",
            flightduration: "",
            flightairline: "",
            flightnotes: "",
            activityname: "",
            activitylocation: "",
            activitytime: "",
            activitynotes: "",
            accomodationname: "",
            accomodationcheckin: "",
            accomodationcheckout: "",
            accomodationlocation: "",
            accomodationnotes: "",
        });
    };

    const handleClose = () => setOpen(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Save event to database
    const handleSaveEvent = async () => {
        setLoading(true);
        try {
            const eventData = {
                tripId,
                ...formData,
                category: eventType,
            };

            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });

            if (response.ok) {
                handleClose();
                onEventAdded?.(); // Trigger refresh
                alert('Event added successfully!');
            } else {
                alert('Failed to add event');
            }
        } catch (error) {
            console.error('Error saving event:', error);
            alert('Error saving event');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button onClick={handleOpen} variant='outlined'>Add Event</Button>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Add Event</DialogTitle>
                <DialogContent>
                    {step === 0 && (
                        <TextField
                            select
                            label="Event Type"
                            value={eventType}
                            onChange={e => setEventType(e.target.value)}
                            fullWidth
                            margin="normal"
                        >
                            <MenuItem value="flight">Flight</MenuItem>
                            <MenuItem value="activity">Activity</MenuItem>
                            <MenuItem value="accommodation">Accommodation</MenuItem>
                        </TextField>
                    )}

                    {step === 1 && eventType === "flight" && (
                        <Stack spacing={2} sx={{ mt: 2 }}>
                            <TextField
                                label="Flight Number"
                                value={formData.flightnumber}
                                onChange={e => handleInputChange('flightnumber', e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Departure"
                                value={formData.flightdeparture}
                                onChange={e => handleInputChange('flightdeparture', e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Arrival"
                                value={formData.flightarrival}
                                onChange={e => handleInputChange('flightarrival', e.target.value)}
                                fullWidth
                            />
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    label="Duration"
                                    value={formData.flightduration}
                                    onChange={e => handleInputChange('flightduration', e.target.value)}
                                />
                                <TextField
                                    label="Airline"
                                    value={formData.flightairline}
                                    onChange={e => handleInputChange('flightairline', e.target.value)}
                                />
                            </Stack>
                            <TextField
                                label="Notes"
                                value={formData.flightnotes}
                                onChange={e => handleInputChange('flightnotes', e.target.value)}
                                multiline
                                rows={3}
                                fullWidth
                            />
                        </Stack>
                    )}

                    {step === 1 && eventType === "activity" && (
                        <Stack spacing={2} sx={{ mt: 2 }}>
                            <TextField
                                label="Activity Name"
                                value={formData.activityname}
                                onChange={e => handleInputChange('activityname', e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Location"
                                value={formData.activitylocation}
                                onChange={e => handleInputChange('activitylocation', e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Time"
                                value={formData.activitytime}
                                onChange={e => handleInputChange('activitytime', e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Notes"
                                value={formData.activitynotes}
                                onChange={e => handleInputChange('activitynotes', e.target.value)}
                                multiline
                                rows={3}
                                fullWidth
                            />
                        </Stack>
                    )}

                    {step === 1 && eventType === "accommodation" && (
                        <Stack spacing={2} sx={{ mt: 2 }}>
                            <TextField
                                label="Hotel Name"
                                value={formData.accomodationname}
                                onChange={e => handleInputChange('accomodationname', e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Check in"
                                value={formData.accomodationcheckin}
                                onChange={e => handleInputChange('accomodationcheckin', e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Check out"
                                value={formData.accomodationcheckout}
                                onChange={e => handleInputChange('accomodationcheckout', e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Location"
                                value={formData.accomodationlocation}
                                onChange={e => handleInputChange('accomodationlocation', e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Notes"
                                value={formData.accomodationnotes}
                                onChange={e => handleInputChange('accomodationnotes', e.target.value)}
                                multiline
                                rows={3}
                                fullWidth
                            />
                        </Stack>
                    )}
                </DialogContent>

                <DialogActions>
                    {step === 0 && (
                        <Button
                            onClick={() => setStep(1)}
                            disabled={!eventType}
                            variant="contained"
                        >
                            Next
                        </Button>
                    )}
                    {step === 1 && (
                        <>
                            <Button onClick={() => setStep(0)}>Back</Button>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button
                                onClick={handleSaveEvent}
                                disabled={loading}
                                variant="contained"
                            >
                                {loading ? 'Adding...' : 'Add Event'}
                            </Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
}