import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow-md">
        <CardHeader className="py-3 text-center">
          <CardTitle className="text-xl font-bold">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="mx-2">
          <form>
            <FieldGroup>
              <Field className="gap-3">
                <FieldLabel className="text-sm" htmlFor="name">Full Name</FieldLabel>
                <Input className="shadow-xs h-9 px-3 rounded-md" id="name" type="text" placeholder="John Doe" required />
              </Field>
              <Field className="gap-3">
                <FieldLabel className="text-sm" htmlFor="email">Email</FieldLabel>
                <Input
                  className="shadow-xs h-9 px-3 rounded-md"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field className="gap-3">
                <Field className="grid grid-cols-2 gap-4">
                  <Field className="gap-3">
                    <FieldLabel className="text-sm" htmlFor="password">Password</FieldLabel>
                    <Input className="shadow-xs h-9 px-3 rounded-md" id="password" type="password" required />
                  </Field>
                  <Field className="gap-3">
                    <FieldLabel className="text-sm" htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input className="shadow-xs h-9 px-3 rounded-md" id="confirm-password" type="password" required />
                  </Field>
                </Field>
                <FieldDescription className="text-sm">
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field className="gap-3">
                <Button type="submit" className="shadow-sm rounded-full h-10 mt-2 border-none">Create Account</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="py-4">
          <FieldDescription className="w-full text-center">
            Already have an account? <a href="/login">Sign in</a>
          </FieldDescription>
        </CardFooter>
      </Card>
      {/* <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription> */}
    </div>
  )
}
