import React from 'react'

interface LayoutProps {
    children: React.ReactNode
}

const styles = {
    container: 'flex flex-col min-h-screen',
    main: 'flex-1 '

}

export default function Layout({ children }: LayoutProps) {


    return (
        <div className={styles.container}>
            <main className={styles.main}>
                {children}
            </main>

        </div>
    )


}