import { ComponentConfig, Fields } from "@measured/puck";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/atoms/form";
import { Input } from "../atoms/input";
import { Textarea } from "../atoms/textarea";
import { Button } from "../atoms/button";
import { useState } from "react";
import { useDocument } from "@yext/pages/util";
import { FinancialprofessionalStream } from "../../types/autogen";
import { createLead } from "../../utils/api";
import { RadioGroup, RadioGroupItem } from "../atoms/radio-group";

const formSchema = z.object({
  preferredContact: z.enum(["email", "phone"], {
    required_error: "Please select a preferred contact method",
  }),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().optional(),
  postalCode: z.string().min(5, "Postal code must be at least 5 characters"),
});

export type LeadFormProps = {
  title: string;
  description?: string;
  submitButtonText: string;
};

const leadFormFields: Fields<LeadFormProps> = {
  title: {
    type: "text",
    label: "Form Title",
  },
  description: {
    type: "textarea",
    label: "Form Description",
  },
  submitButtonText: {
    type: "text",
    label: "Submit Button Text",
  },
};

export const LeadForm = ({
  title,
  description,
  submitButtonText,
}: LeadFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preferredContact: "email",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      postalCode: "",
    },
  });

  const { _site, id } = useDocument<FinancialprofessionalStream>();
  const { c_orgId, c_themeId } = _site;

  if (!c_orgId || !c_themeId) {
    console.error("No orgId or themeId found");
    return null;
  }

  const [isSubmitting, setIsSubmitting] = useState(false);

  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      createLead(c_orgId, id, {
        ...values,
        contactMethod: "email",
        themeId: c_themeId,
        optin: true,
      }),
    onSuccess: () => {
      form.reset();
      // You can add a success message or redirect here
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    mutation.mutate(values);
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {description && <p className="mb-4">{description}</p>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="preferredContact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Contact Method</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="email" />
                      </FormControl>
                      <FormLabel className="font-normal">Email</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="phone" />
                      </FormControl>
                      <FormLabel className="font-normal">Phone</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} type="tel" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message (Optional)</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : submitButtonText}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export const LeadFormComponent: ComponentConfig<LeadFormProps> = {
  fields: leadFormFields,
  defaultProps: {
    title: "Contact Us",
    description: "Fill out the form below and we'll get back to you soon.",
    submitButtonText: "Submit",
  },
  render: ({ title, description, submitButtonText }) => (
    <LeadForm
      title={title}
      description={description}
      submitButtonText={submitButtonText}
    />
  ),
};
