import type { SelectOption } from "naive-ui"
import { FuelType, TransmissionFull } from "../types/CarInfo.type"
import { useRoute, useRouter } from "vue-router"
import { computed } from "vue"

export function useCars() {
    const route = useRoute()
    const { replace } = useRouter()

    const transmissionOptions: Array<SelectOption> = [
        {
            label: "Manual",
            value: TransmissionFull.Manual
        },
        {
            label: "Automatic",
            value: TransmissionFull.Auto

        },
    ]

    const fuelTypeOptions: Array<SelectOption> = [
        {
            label: "Gas",
            value: FuelType.Gas
        },
        {
            label: "Diesel",
            value: FuelType.Diesel
        },
        {
            label: "Electricity",
            value: FuelType.Electricity
        },
    ]

    const yearOptions: Array<SelectOption> = [
        {
            label: "1993",
            value: "1993"
        },
        {
            label: "1994",
            value: "1994"
        },
        {
            label: "1995",
            value: "1995"
        },
    ]

    const currentQuery = computed(() => route.query)

    function updateCarsGetQuery(value: string | null, key: 'transmission' | 'fuel_type ' | 'year' | 'make') {
        if (value !== null) {
            replace({
                query: {
                    ...currentQuery.value,
                    [key]: value?.toString()
                }
            })
        } else {
            const query = { ...currentQuery.value }

            delete query[key]

            replace({
                query
            })
        }
    }

    return {
        transmissionOptions,
        fuelTypeOptions,
        yearOptions,
        updateCarsGetQuery
    }
}