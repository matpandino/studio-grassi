import { FC, ReactNode } from 'react'

interface ShellContentProps {
  children: ReactNode
}

const ShellContent: FC<ShellContentProps> = ({ children }) => {
  return (
    <main className="flex w-full justify-center mt-10">
      <div className="md:max-w-5xl flex-1 p-6">{children}</div>
    </main>
  )
}

export default ShellContent
