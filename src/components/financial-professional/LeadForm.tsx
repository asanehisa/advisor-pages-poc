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
import { Section } from "../atoms/section";
import { Body } from "../atoms/body";
import { Heading } from "../atoms/heading";
import { Checkbox } from "../atoms/checkbox";
import { Image } from "@yext/pages-components";

const formSchema = z.object({
  preferredContact: z.enum(["email", "phone"], {
    required_error: "Please select a preferred contact method",
  }),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      "Invalid email address"
    ),
  phone: z
    .string()
    .regex(
      /^[\(]{0,1}[0-9]{3}([\)]{0,1}[-|\s]|.|\s){0,1}[0-9]{3}(-|.|\s){0,1}[0-9]{4}[x0-9]*$/,
      "Invalid phone number format"
    ),
  message: z.string().optional(),
  optin: z.boolean().optional(),
  consentToText: z.boolean().refine((val) => val === true, {
    message: "You must consent to receive text messages",
  }),
});

export type LeadFormProps = {
  title: string;
  subtitle?: string;
  submitButtonText: string;
};

const leadFormFields: Fields<LeadFormProps> = {
  title: {
    type: "textarea",
    label: "Form Title",
  },
  subtitle: {
    type: "text",
    label: "Subtitle",
  },
  submitButtonText: {
    type: "text",
    label: "Submit Button Text",
  },
};

export const LeadForm = ({
  title,
  subtitle,
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
      optin: false,
      consentToText: false,
    },
  });

  const {
    _site,
    id,
    name: advisorName,
  } = useDocument<FinancialprofessionalStream>();
  const { c_orgId, c_themeId, c_contactImage } = _site;

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
    <Section className="font-inter">
      <div className="max-w-screen-xl mx-auto px-3 py-24">
        <div className="xl:grid xl:grid-cols-2 xl:gap-8">
          <div>
            <div className="flex flex-col justify-start pb-12">
              <Body
                className="text-left uppercase"
                fontFamily="inter"
                weight="light"
                color="primary"
              >
                {subtitle}
              </Body>
              <Heading
                className="text-left pt-5"
                fontFamily="inter"
                level={2}
                color="primary"
              >
                {title}
              </Heading>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="preferredContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred communication method:</FormLabel>
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
                      <FormControl>
                        <Input {...field} placeholder="First Name" />
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
                      <FormControl>
                        <Input {...field} placeholder="Last Name" />
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
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Email"
                          autoComplete="off"
                        />
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
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="Phone Number"
                        />
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
                      <FormControl>
                        <Textarea {...field} placeholder="Message" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="consentToText"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I consent to allowing {advisorName} to send me text
                          messages on behalf of Taurus.
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting || !form.watch("consentToText")}
                  className="w-full uppercase"
                >
                  {isSubmitting ? "Submitting..." : submitButtonText}
                </Button>
              </form>
            </Form>
          </div>
          {c_contactImage && (
            <div className="hidden relative xl:flex xl:justify-center">
              <div className="w-[418px] h-[418px] bg-primary"></div>
              <Image
                image={c_contactImage}
                width={418}
                height={418}
                layout="fixed"
                className="absolute top-32 left-0"
              />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export const LeadFormComponent: ComponentConfig<LeadFormProps> = {
  fields: leadFormFields,
  defaultProps: {
    title: "Contact Us",
    subtitle: "Fill out the form below and we'll get back to you soon.",
    submitButtonText: "Submit",
  },
  render: ({ title, subtitle, submitButtonText }) => (
    <LeadForm
      title={title}
      subtitle={subtitle}
      submitButtonText={submitButtonText}
    />
  ),
};
