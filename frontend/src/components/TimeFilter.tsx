import { useEffect } from 'react'
import { Center, Container, Text, Switch, HStack, Input } from '@chakra-ui/react'
import { useFormik } from 'formik'

type TimeFilterProps = {
    onFilterChange: (isFiltering: boolean, startDate: Date | null, endDate: Date | null) => void
}

export const TimeFilter = ({ onFilterChange }: TimeFilterProps) => {
    const { values, handleChange, setFieldValue } = useFormik({
        initialValues: {
            isFiltering: false,
            startDate: '',
            endDate: '',
        },
        onSubmit: () => {},
    })

    // Call onFilterChange when the filter values change
    useEffect(() => {
        if (onFilterChange) {
            onFilterChange(
                values.isFiltering,
                values.startDate ? new Date(values.startDate) : null,
                values.endDate ? new Date(values.endDate) : null,
            )
        }
    }, [values.isFiltering, values.startDate, values.endDate])

    return (
        <Center>
            <Container p={2} width='fit-content'>
                <HStack spacing={6} alignItems='center'>
                    <HStack alignItems='center'>
                        <Text>Filter by time period</Text>
                        <Switch
                            id='isFiltering'
                            name='isFiltering'
                            isChecked={values.isFiltering}
                            onChange={e => setFieldValue('isFiltering', e.target.checked)}
                        />
                    </HStack>
                    <HStack w='md' spacing={2} alignItems='center'>
                        <Input
                            id='startDate'
                            name='startDate'
                            type='datetime-local'
                            isDisabled={!values.isFiltering}
                            value={values.startDate}
                            onChange={handleChange}
                        />
                        <Text>to</Text>
                        <Input
                            id='endDate'
                            name='endDate'
                            type='datetime-local'
                            isDisabled={!values.isFiltering}
                            value={values.endDate}
                            onChange={handleChange}
                        />
                    </HStack>
                </HStack>
            </Container>
        </Center>
    )
}
