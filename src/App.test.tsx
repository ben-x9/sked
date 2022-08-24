import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import App from "./App"
import usePosts from "./hooks/usePosts"
import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import posts from "./fixtures/posts"

const mockedUsePosts = usePosts as jest.Mock<any>
jest.mock("./hooks/usePosts")

const queryClient = new QueryClient()
const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe("App", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test("Shows loading...", async () => {
    mockedUsePosts.mockImplementation(() => ({ isLoading: true }))
    render(<App />, { wrapper })

    const label = await screen.findByLabelText("Select All Accounts")
    expect(label).toBeInTheDocument
    const loading = await screen.findByText("Loading...")
    expect(label).toBeInTheDocument
  })

  test("Clicking a checkbox toggles it", async () => {
    mockedUsePosts.mockImplementation(() => ({ data: posts }))
    render(<App />, { wrapper })
    const user = userEvent.setup()

    const checkbox = (
      await screen.findAllByRole("checkbox")
    )[0] as HTMLInputElement
    expect(checkbox.checked).toBe(false)
    await user.click(checkbox)
    expect(checkbox.checked).toBe(true)
  })

  test("'Select All Accounts' toggles all checkboxes", async () => {
    mockedUsePosts.mockImplementation(() => ({ data: posts }))
    render(<App />, { wrapper })
    const user = userEvent.setup()

    const selectAll = (await screen.findByRole("checkbox", {
      name: "Select All Accounts",
    })) as HTMLInputElement

    const checkboxes = (await screen.findAllByRole(
      "checkbox"
    )) as HTMLInputElement[]

    await user.click(selectAll)
    expect(checkboxes.every(checkbox => checkbox.checked)).toBe(true)

    await user.click(selectAll)
    expect(checkboxes.every(checkbox => checkbox.checked)).toBe(false)

    await user.click(checkboxes.at(-1)!)
    expect(checkboxes.at(-1)!.checked).toBe(true)

    await user.click(selectAll)
    expect(checkboxes.every(checkbox => checkbox.checked)).toBe(true)
  })

  test("When no filters are checked show nothing", async () => {
    mockedUsePosts.mockImplementation(() => ({ data: posts }))
    render(<App />, { wrapper })
    const user = userEvent.setup()

    const checkboxes = (await screen.findAllByRole(
      "checkbox"
    )) as HTMLInputElement[]
    expect(checkboxes.every(checkbox => checkbox.checked)).toBe(false)

    const card = await screen.queryByRole("listitem")
    expect(card).not.toBeInTheDocument
  })

  test("When select all is checked show all cards", async () => {
    mockedUsePosts.mockImplementation(() => ({ data: posts }))
    render(<App />, { wrapper })
    const user = userEvent.setup()

    const selectAll = (await screen.findByRole("checkbox", {
      name: "Select All Accounts",
    })) as HTMLInputElement

    await user.click(selectAll)

    const cards = await screen.findAllByRole("listitem")
    expect(cards).toHaveLength(posts.length)
  })

  test("When only fb is checked show fb cards only", async () => {
    mockedUsePosts.mockImplementation(() => ({ data: posts }))
    render(<App />, { wrapper })
    const user = userEvent.setup()

    const fb = (await screen.findByRole("checkbox", {
      name: "FB",
    })) as HTMLInputElement

    await user.click(fb)

    const cards = await screen.findAllByRole("listitem")
    cards.forEach(card => expect(card).toHaveTextContent("FB account"))
  })

  test("When only ig is checked show ig cards only", async () => {
    mockedUsePosts.mockImplementation(() => ({ data: posts }))
    render(<App />, { wrapper })
    const user = userEvent.setup()

    const ig = (await screen.findByRole("checkbox", {
      name: "IG",
    })) as HTMLInputElement

    await user.click(ig)

    const cards = await screen.findAllByRole("listitem")
    cards.forEach(card => expect(card).toHaveTextContent("IG account"))
  })
})
