import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { theme } from '@chakra-ui/pro-theme'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import App from 'App'

const proTheme = extendTheme(theme)
const customTheme = extendTheme(
    {
        colors: {
            ...proTheme.colors,
            accentColor: 'gray',
            brand: proTheme.colors.blue,
        },
    },
    proTheme,
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <ChakraProvider theme={customTheme}>
                <App />
            </ChakraProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
