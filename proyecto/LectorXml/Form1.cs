using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Diagnostics;
using System.IO;
using System.Xml;
using System.Xml.Linq;
using System.Text.RegularExpressions;
using Newtonsoft.Json;

namespace LectorXml
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            OpenFileDialog buscar = new OpenFileDialog();
            string extension;

            if(buscar.ShowDialog() == DialogResult.OK)
            {
                extension = Path.GetExtension(buscar.FileName);
                if(extension==".xml")
                {
                    textBox1.Text = buscar.FileName;
                }
                else
                {
                    MessageBox.Show("Archivo Incorrecto");
                }
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            string UMLClassDiagram = "UMLClassDiagram";
            string superitem = "superitem";
            string UMLAssociation = "UMLAssociation";
            string point = "point";
            string UMLGeneralization = "UMLGeneralization";
            string valueAst = "value=\"*\"";
            string valueUno = "value=\"1\"";
            string valueNulo = "value=\"\"";
            char quitalo = '+';
            char quitalo2 = ':';
            char quitalo3 = '_';
            char quitalo4 = '#';

            string line;

            string NewXml = "";
            StreamReader seCargoXml = new StreamReader(textBox1.Text);
            
            while ((line = seCargoXml.ReadLine()) != null)
            {
                if (line.Contains(UMLClassDiagram)
                    || line.Contains(superitem) || line.Contains(UMLAssociation)
                    || line.Contains(point) || line.Contains(UMLGeneralization)
                    || line.Contains(valueAst) || line.Contains(valueUno)
                    || line.Contains(valueNulo))
                {
                }
                else
                {
                    if (line.Contains(quitalo))
                    {
                        line = line.Replace("+", "");
                    }
                    if (line.Contains(quitalo2))
                    {
                        line = line.Replace(":", " ");
                    }
                    if (line.Contains(quitalo3))
                    {
                        line = line.Replace("_", "");
                    }
                    if (line.Contains(quitalo4))
                    {
                        line = line.Replace("#", "");
                    }
                    NewXml += line;
                    richTextBox1.Text = NewXml;
                }
            } 
            seCargoXml.Close();
            Console.WriteLine(NewXml);

            XmlTextReader reader = new XmlTextReader(new StringReader(NewXml));          
            StringWriter writer = new StringWriter();
            
            while (reader.Read())
            {
                //cadena que almacenará la indentación
                string indentado = new string('\t', reader.Depth);
                //evaluando el tipo de nodo
                switch (reader.NodeType)
                {
                    //si tipo de nodo es: <?xml version='1.0' encoding='ISO-8859-1'?>
                    case XmlNodeType.XmlDeclaration:
                        //usamos Value para imprimir "xml version='1.0' encoding='ISO-8859-1'"
                        writer.WriteLine("<?{0}?>", reader.Value);
                        break;
                    //if el tipo de nodo es un comentario
                    case XmlNodeType.Comment:
                        writer.WriteLine("{0}<!--{1}-->", indentado, reader.Value);
                        break;
                    //si tipo de nodo es elemento
                    case XmlNodeType.Element:
                    {
                        //y si tiene atributos
                        if (reader.HasAttributes)
                        {
                            //entonces creamos una cadena "atributos" que guardará
                            //los atributos de este nodo.
                            if (reader.LocalName == "UMLClass")
                            {                                        
                                writer.WriteLine("{0}<UMLClass>", indentado);
                            }
                            string atributos = null;
                            string Id = null;
                            for (int i = 0; i < reader.AttributeCount; i++)
                            {
                                //nos movemos para realizar la lectura del atrbiuto de acuerdo al índice.
                                reader.MoveToAttribute(i);
                                //una vez que estamos ubicados en la posición correcta,
                                //leemos el nombre del atributo, como también el valor.                                        
                                if (i==1&& reader.Name=="value")
                                {
                                    Id += reader.Value;
                                    writer.WriteLine("{0}<Id>{1}</Id>", indentado, Id);  
                                }
                                if (i==0&&reader.Name!="id"&&reader.LocalName!="UMLClass")
                                { 
                                    atributos += reader.Value;
                                    writer.WriteLine("{0}<atributo>{1}</atributo>", indentado, atributos);
                                }
                            }
                            //despues de haber leido los atributos del elemento...
                            //moveremos el puntero al elemento.
                            reader.MoveToElement();                            
                        } 
                        else
                        {
                            //si la profundidad del nodo es diferente a 2
                            if (reader.Depth != 2)
                                writer.WriteLine("{0}<{1}>", indentado, reader.LocalName);
                            else
                                writer.Write("{0}<{1}>", indentado, reader.LocalName);
                        }
                    }
                    break;
                    //if el tipo de nodo es contenido.
                    case XmlNodeType.Text:
                        //imprimimos el contenido.
                        writer.Write(reader.Value);
                        break;
                    //si el tipo de nodo es un elemento final o de cierre.
                    case XmlNodeType.EndElement:
                        //y además, averiguamos si es el que Depth es 2 entonces 
                        //no le agregamos la indentación, imprimiendo de esta manera: 
                        //<title>XML Programming</title> en vez de <title>XML Programming        </title>
                        if (reader.Depth == 2)
                            writer.WriteLine("</{0}>", reader.LocalName);
                        else
                            //con indentación tabPrefix
                            writer.WriteLine("{0}</{1}>", indentado, reader.LocalName);
                        break;
                }
            }
            //cerramos el reader
            reader.Close();
            //mostrar los resultados.
            string text = writer.ToString();
            Console.Write(text);
            richTextBox2.Text = writer.ToString();
        }
        private void button4_Click(object sender, EventArgs e)
        {
            richTextBox1.Text = "";
            int x = this.richTextBox2.Lines.Count();
            for (int i = 0; i <= this.richTextBox2.Lines.Count() - 1; i++)
            {
                if (richTextBox2.Lines[i].Contains("<Id>"))
                {
                    richTextBox1.Text += richTextBox2.Lines[i].Replace("<Id>", "").Replace("</Id>", "").Trim() + "\n";
                    comboBox1.Items.Add(richTextBox2.Lines[i].Replace("<Id>", "").Replace("</Id>", "").Trim());
                }
            }        
        }
        private void button3_Click(object sender, EventArgs e)
        {
            comboBox2.ResetText();
            comboBox2.Items.Clear();
            if (comboBox1.SelectedIndex<=-1)
            {
                MessageBox.Show("No has seleccionado algun valor");
            }
            else
            {
                string seleccion = "";
                seleccion = comboBox1.SelectedItem.ToString();
                int x = this.richTextBox1.Lines.Count();
                for (int i = 0; i <= this.richTextBox1.Lines.Count()-1; i++)
                {
                    if (richTextBox1.Lines[i].Contains(seleccion))
                    {
                    }
                    else
                    {                      
                        comboBox2.Items.Add(richTextBox1.Lines[i]);
                    }
                }
            }
        }

        private void button5_Click(object sender, EventArgs e)
        {
            if (comboBox1.SelectedIndex <= -1 && comboBox2.SelectedIndex <= -1)
            {
                MessageBox.Show("No has seleccionado algun valor");
            }
            else
            {
                string hijo = "";
                string padre = "";
                hijo = comboBox1.SelectedItem.ToString();
                padre = comboBox2.SelectedItem.ToString();
                MessageBox.Show(hijo + " hereda de " + padre);

                string busca = "<Id>" + hijo + "</Id>";
                string agregaSiE = "<HeredaDe>" + padre + "</HeredaDe>";
                string agrega = "<" + hijo + "><HeredaDe>" + padre + "</HeredaDe></" + hijo + ">";
                string xml = richTextBox2.Text;

                XmlDocument xmlDoc = new XmlDocument();
                xmlDoc.LoadXml(xml);
                XmlDocumentFragment xmlDocFragment = xmlDoc.CreateDocumentFragment();
                xmlDocFragment.InnerXml = agrega;
                xmlDoc.SelectSingleNode("umldiagrams").AppendChild(xmlDocFragment);

                StringWriter sw = new StringWriter();
                XmlTextWriter tx = new XmlTextWriter(sw);
                xmlDoc.WriteTo(tx);

                Console.WriteLine(sw.ToString());
                richTextBox2.Text = "";
                richTextBox2.Text = sw.ToString();

                string json=JsonConvert.SerializeXmlNode(xmlDoc);
                richTextBox3.Text = json;

                Console.WriteLine(json);

            }
        }

        private void button6_Click(object sender, EventArgs e)
        {
            SaveFileDialog saveFileDialog1 = new SaveFileDialog();
            saveFileDialog1.InitialDirectory = @"C:\";      
            saveFileDialog1.Title = "Save text Files";
            saveFileDialog1.CheckFileExists = false;
            saveFileDialog1.CheckPathExists = true;
            saveFileDialog1.DefaultExt = "xml";
            saveFileDialog1.Filter = "Text files (*.json)|*.json";
            saveFileDialog1.FilterIndex = 2;
            saveFileDialog1.RestoreDirectory = true;
            if (saveFileDialog1.ShowDialog() == DialogResult.OK)
            {
                string name = saveFileDialog1.FileName;
                File.WriteAllText(name, richTextBox3.Text);
            }
        }
    }
}
